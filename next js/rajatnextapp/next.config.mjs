/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir: true,
        serverComponentsExternalPackages:["mongoose"]
    },
    images:{
        domains:['occ-0-3933-116.1.nflxso.net']
    }
};


export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       appDir: true,
//       serverComponentsExternalPackages: ["mongoose"],
//     },
//     images:{
//       domains:['occ-0-3933-116.1.nflxso.net']
//     }
//   }
//   export default nextConfig;




// export function webpack(config, { }) {
//     // This prevents the use of symlinks in your project
//     config.resolve.symlinks = false;
//     return config;
// }
  
