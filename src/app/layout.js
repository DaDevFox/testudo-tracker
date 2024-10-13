import { roboto } from "@/utils/fonts";
import "@/styles/globals.css";
import componentStyles from "@/styles/components.module.css";

import { UserProvider } from "@/utils/UserProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Testudo Tracker",
  description:
    "Track UMD course sections; get notified of course seat changes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={roboto.className}>
          <Navbar />
          <main className="main">
            <div className={componentStyles.subNavbar}>{children}</div>
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
