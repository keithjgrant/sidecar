import React from 'react';
import { Link } from 'gatsby';
import IndexLayout from '../components/layouts/IndexLayout';

export default function DevelPage() {
  return (
    <IndexLayout title="Test">
      <p>
        Dev testing. You’re not supposed to be here.{' '}
        <Link to="/">Back to home</Link>
      </p>
      <div>
        <button type="button" onClick={() => window.navigator.vibrate(10)}>
          10ms
        </button>
        <button type="button" onClick={() => window.navigator.vibrate(15)}>
          15ms
        </button>
        <button type="button" onClick={() => window.navigator.vibrate(20)}>
          20ms
        </button>
        <button type="button" onClick={() => window.navigator.vibrate(25)}>
          25ms
        </button>
      </div>
    </IndexLayout>
  );
}
