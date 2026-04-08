import "./globals.css";

export const metadata = {
  title: "Polynomial Solver",
  description: "Calculate roots of any degree",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}