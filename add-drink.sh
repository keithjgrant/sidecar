#!/bin/zsh

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

if [ -z "$1" ]; then
  echo -e "${RED}Usage: ./add-drink.sh \"Drink Name\"${NC}"
  exit 1
fi

NAME="$1"
SLUG=$(echo "$NAME" | sed -e 's/[^[:alnum:]]/-/g' | tr -s '-' | tr A-Z a-z | sed 's/^-//;s/-$//')
DATE=$(date "+%Y-%m-%dT%H:%M:%S%z" | sed 's/\(..\)$/:\1/')
FILE="src/pages/drinks/${SLUG}.md"

if [ -f "$FILE" ]; then
  echo -e "${RED}Cannot create '$FILE': already exists${NC}"
  exit 1
fi

ESCAPED_NAME=$(echo "$NAME" | sed 's/[&/\]/\\&/g')

echo -e "Creating: ${GREEN}${FILE}${NC}"
sed "s/title:/title: \"${ESCAPED_NAME}\"/" DRINK_TEMPLATE.md > "$FILE"
sed -i '' "s/path:/path: \"\/drinks\/${SLUG}\"/" "$FILE"
sed -i '' "s/^date:/date: ${DATE}/" "$FILE"
