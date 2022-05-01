import React from "react";

export default function navbar() {
  return (
    <nav
      class="{'flex': open, 'hidden': !open}"
      className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row"
    >
      <div className="relative" x-data="{ open: false }">
        <button className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-blue-800 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-blue-800 focus:outline-none focus:shadow-outline">
          <span>Jane Doe</span>
          <img
            className="inline h-6 rounded-full"
            src="https://avatars2.githubusercontent.com/u/24622175?s=60&v=4"
          />
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            class="{'rotate-180': open, 'rotate-0': !open}"
            className="inline w-4 h-4 transition-transform duration-200 transform"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          x-show="open"
          className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48"
        >
          <div className="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm">
            <a
              className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
            >
              Settings
            </a>
            <a
              className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
            >
              Help
            </a>
            <div className="border-b" />
            <a
              className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
