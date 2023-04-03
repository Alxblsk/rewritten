import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <div className="page-header">
  <div className="page-header-content">
    <Link to={'/'}>
      <svg width="92" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.481.211v24.543H.294V.211h2.187Zm8.24 0v24.543H8.534V.211h2.187Z" fill="#E80000" fillOpacity=".9"/><path d="M25.007 10.417c1.908 0 3.375.477 4.401 1.431 1.044.936 1.566 2.349 1.566 4.239 0 2.052-.54 3.555-1.62 4.509-1.08.936-2.628 1.404-4.644 1.404h-3.996V3.397h8.613l-.297 2.025h-5.859v4.995h1.836Zm-.135 9.612c1.224 0 2.115-.279 2.673-.837.558-.558.837-1.584.837-3.078 0-1.332-.288-2.286-.864-2.862-.558-.594-1.422-.891-2.592-.891h-1.755v7.668h1.701ZM42.3 14.467c0 .396-.018.81-.054 1.242h-7.452c.072 1.71.351 2.916.837 3.618.504.702 1.215 1.053 2.133 1.053.594 0 1.125-.09 1.593-.27.468-.198.954-.504 1.458-.918l1.053 1.431c-1.188 1.134-2.583 1.701-4.185 1.701-1.692 0-3.006-.621-3.942-1.863-.936-1.26-1.404-3.069-1.404-5.427 0-2.358.441-4.203 1.323-5.535.9-1.35 2.16-2.025 3.78-2.025 1.566 0 2.763.594 3.591 1.782.846 1.17 1.27 2.907 1.27 5.211Zm-2.295-.702c0-1.548-.207-2.673-.62-3.375-.415-.702-1.063-1.053-1.945-1.053-.792 0-1.413.36-1.863 1.08-.45.702-.71 1.881-.783 3.537h5.211v-.189Zm13.32-5.994V22h-2.376V9.715h-3.32l.026.027-.432 6.129c-.108 1.584-.26 2.754-.459 3.51-.18.756-.486 1.341-.918 1.755-.414.414-1.08.81-1.998 1.188l-.594-1.863c.468-.216.81-.477 1.026-.783.216-.324.37-.756.46-1.296.09-.558.17-1.476.242-2.754l.513-7.857h7.83Zm6.904 4.617c1.89 0 3.25.414 4.077 1.242.846.828 1.27 1.998 1.27 3.51 0 1.62-.46 2.835-1.378 3.645-.9.81-2.079 1.215-3.537 1.215h-3.942V7.771h2.376v4.617h1.134Zm.19 7.749c.9 0 1.565-.225 1.997-.675.45-.45.675-1.224.675-2.322 0-1.008-.207-1.746-.62-2.214-.415-.468-1.126-.702-2.134-.702h-1.242v5.913h1.323Zm11.82-12.663c.72 0 1.367.117 1.943.351.576.234 1.134.621 1.674 1.161l-1.08 1.404a4.774 4.774 0 0 0-1.215-.756 3.12 3.12 0 0 0-1.242-.243c-1.908 0-2.862 1.854-2.862 5.562 0 1.926.243 3.303.73 4.131.485.828 1.187 1.242 2.105 1.242.45 0 .855-.081 1.215-.243.378-.162.792-.414 1.242-.756l1.107 1.431c-1.08 1.044-2.277 1.566-3.59 1.566-1.693 0-3.007-.612-3.943-1.836-.936-1.224-1.404-3.051-1.404-5.481 0-2.376.477-4.221 1.431-5.535.954-1.332 2.25-1.998 3.888-1.998Zm14.596.297-3.456 6.588L87.24 22h-2.51l-3.268-6.588h-1.404V22h-2.376V7.771h2.376v5.778h1.458l3.024-5.778h2.295Zm4.338 0V22h-2.376V7.771h2.376Zm-1.215-6.75c.486 0 .873.153 1.16.459.289.306.433.702.433 1.188 0 .45-.153.828-.46 1.134-.287.306-.665.459-1.133.459-.468 0-.855-.153-1.161-.459-.288-.306-.432-.684-.432-1.134 0-.468.144-.855.432-1.161.306-.324.693-.486 1.16-.486Z" fill="#000"/></svg>
    </Link>
    <a
      href="https://twitter.com/Alxblsk"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg width="33" height="33" fill="none">
        <path
          d="M32.816 7.075c-1.194.53-2.478.887-3.827 1.051a6.7 6.7 0 002.93-3.689 13.347 13.347 0 01-4.234 1.617 6.652 6.652 0 00-4.864-2.103 6.665 6.665 0 00-6.49 8.181c-5.538-.278-10.446-2.935-13.733-6.966a6.638 6.638 0 00-.902 3.357 6.652 6.652 0 002.964 5.543 6.606 6.606 0 01-3.019-.833v.084a6.67 6.67 0 005.345 6.535 6.605 6.605 0 01-1.755.233c-.432 0-.848-.04-1.255-.12.848 2.643 3.307 4.577 6.222 4.626a13.337 13.337 0 01-8.274 2.851c-.54 0-1.066-.03-1.587-.09a18.857 18.857 0 0010.213 2.99c12.256 0 18.96-10.153 18.96-18.954 0-.292-.005-.58-.02-.867a13.328 13.328 0 003.326-3.446z"
          fill="#000"
        />
      </svg>
    </a>
  </div>
</div>
)

export default Header
