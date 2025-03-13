import { CommentSort } from '@/generated/graphql';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import type { Dispatch, SetStateAction } from 'react';
import { HiCheck, HiChevronDown } from 'react-icons/hi';

interface Props {
  value: CommentSort;
  onChange: Dispatch<SetStateAction<CommentSort>>;
}

const CommentSortSelect = ({ value, onChange }: Props) => (
  <Listbox value={value} onChange={onChange} as="div">
    <Listbox.Button>
      <div
        className={clsx(
          'w-32 px-3 py-1.5 flex items-center justify-between gap-2',
          'text-black bg-white',
          'dark:text-white dark:bg-black',
        )}
      >
        <span className="text-sm">
          {Object.entries(CommentSort).find(o => o[1] === value)?.[0]}
        </span>
        <HiChevronDown />
      </div>
    </Listbox.Button>

    <Listbox.Options className="z-10 absolute shadow-2xl w-32">
      {Object.entries(CommentSort).map(([label, name]) => (
        <Listbox.Option
          className={clsx(
            'p-2 text-sm cursor-pointer text-neutral-600 bg-neutral-100 hover:bg-neutral-200 dark:text-neutral-300 dark:bg-black dark:hover:bg-neutral-900',
          )}
          value={name}
          key={name}
        >
          {({ selected }) => (
            <li
              className={`relative flex items-center ${selected ? 'font-bold' : ''}`}
            >
              {selected && (
                <HiCheck className="absolute h-5 w-5 text-caribbean-green-700" />
              )}
              <span className="pl-7">{label}</span>
            </li>
          )}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </Listbox>
);

export default CommentSortSelect;
