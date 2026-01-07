export const metadata = { title: 'Reddit Pulse', description: 'Reddit sentiment analyzer' };
export default function RootLayout({ children }) {
  return <html lang="en"><body style={{margin:0}}>{children}</body></html>;
}
