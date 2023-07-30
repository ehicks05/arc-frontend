import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlineUser,
  HiOutlineX,
  HiPlus,
} from 'react-icons/hi';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useModal } from 'react-modal-hook';
import { toGravatarUrl } from '@/utils/gravatar';
import { AuthDialog } from '@/components';
import { useUser } from '@/hooks';
import { supabase } from '@/supabase';

const NAV_LINKS = [
  { name: 'Hot', href: '/' },
  { name: 'Top', href: '/top' },
  { name: 'New', href: '/new' },
];

const MobileMenuButton = ({ open }: { open: boolean }) => (
  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
    <span className="sr-only">Open main menu</span>
    {open ? (
      <HiOutlineX className="block h-6 w-6" aria-hidden="true" />
    ) : (
      <HiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
    )}
  </Disclosure.Button>
);

const Logo = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link to="/">
      <img className="inline h-8 w-auto" src="/lightningbolt.svg" alt="logo" />
      <img className="hidden lg:inline h-8 w-auto" src="/name.svg" alt="logo" />
    </Link>
  </div>
);

const NonMobileLinks = () => {
  const location = useLocation();

  return (
    <div className="hidden sm:ml-6 sm:flex space-x-4">
      {NAV_LINKS.map(item => {
        const isActive = location.pathname === item.href;
        const isActiveClasses = isActive
          ? 'bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'
          : 'text-neutral-600 bg-neutral-100 hover:bg-neutral-200 hover:text-black dark:text-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-white';
        const classes = `px-3 py-2 rounded-md text-sm font-medium ${isActiveClasses}`;
        return (
          <NavLink key={item.name} to={item.href} className={classes}>
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
};

const ProfileMenu = ({ showAuthModal }: { showAuthModal: () => void }) => {
  const { user } = useUser();
  const signOut = () => supabase.auth.signOut();

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            {!user?.email && (
              <div className="dark:bg-neutral-800 p-1 rounded-full text-neutral-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <HiOutlineUser className="h-6 w-6" />
              </div>
            )}
            {user?.email && (
              <img
                className="h-8 w-8 rounded-full"
                src={toGravatarUrl(user?.email)}
                alt="avatar"
              />
            )}
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 text-sm bg-white dark:bg-neutral-700 dark:text-neutral-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {user && (
                <>
                  <Menu.Item>
                    <Link to={`/users/${user.id}`} className="block px-4 py-2">
                      Your Profile
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/settings" className="block px-4 py-2">
                      Settings
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="#" onClick={signOut} className="block px-4 py-2">
                      Sign Out
                    </Link>
                  </Menu.Item>
                </>
              )}
              {!user && (
                <Menu.Item>
                  {() => (
                    <Link to="#" onClick={showAuthModal} className="block px-4 py-2">
                      Sign In
                    </Link>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default function Header() {
  const location = useLocation();
  const { username } = useUser();

  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <MobileMenuButton open={open} />
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Logo />
                <NonMobileLinks />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
                <button
                  title="Create a Post"
                  className="dark:bg-neutral-800 p-1 rounded-full text-neutral-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Create a Post</span>
                  {username && (
                    <Link to="/posts/create">
                      <HiPlus className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  )}
                  {!username && (
                    <div onClick={showAuthModal}>
                      <HiPlus className="h-6 w-6" aria-hidden="true" />
                    </div>
                  )}
                </button>

                <button className="dark:bg-neutral-800 p-1 rounded-full text-neutral-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <HiOutlineBell className="h-6 w-6" aria-hidden="true" />
                </button>

                <ProfileMenu showAuthModal={showAuthModal} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAV_LINKS.map(item => (
                <NavLink
                  end
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium
                  ${location.pathname !== item.href ? 'text-neutral-300' : ''}
                  `}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
