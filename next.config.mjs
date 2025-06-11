/** @format */

import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  contentDirBasePath: "/blog",
});

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fluxp",
        permanent: true,
      },
    ];
  },
  // ... Other Next.js config options
  devIndicators: false,
});
