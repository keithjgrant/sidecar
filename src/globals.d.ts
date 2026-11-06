declare module '@fontsource/*' {}

declare module '@gatsbyjs/reach-router' {
  type HistoryLocation = { pathname: string };

  export const globalHistory: {
    location: HistoryLocation;
    listen: (
      listener: (args: { location: HistoryLocation; action: string }) => void
    ) => () => void;
  };

  export function useLocation(): HistoryLocation;
}
