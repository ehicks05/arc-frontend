import { CommentSort } from '@/generated/graphql';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@radix-ui/react-select';
import clsx from 'clsx';
import type { Dispatch, SetStateAction } from 'react';
import { HiCheck, HiChevronDown } from 'react-icons/hi';

interface Props {
  value: CommentSort;
  onChange: Dispatch<SetStateAction<CommentSort>>;
}

const CommentSortSelect = ({ value, onChange }: Props) => (
  <Select value={value} onValueChange={v => onChange(v as CommentSort)}>
    <SelectTrigger
      className={clsx(
        'w-32 px-3 py-1.5 flex items-center justify-between gap-2 text-sm ring-0 outline-none',
        'text-black bg-white',
        'dark:text-white dark:bg-black',
      )}
    >
      {Object.entries(CommentSort).find(o => o[1] === value)?.[0]}
      <HiChevronDown />
    </SelectTrigger>

    <SelectContent
      className="z-10 absolute shadow-2xl w-32 text-sm"
      side="bottom"
    >
      {Object.entries(CommentSort).map(([label, name]) => {
        const selected = name === value;
        return (
          <SelectItem
            className={
              'p-2 cursor-pointer text-neutral-600 bg-neutral-100 dark:text-neutral-300 dark:bg-black'
            }
            value={name}
            key={name}
          >
            <li className={'relative flex items-center'}>
              {selected && (
                <HiCheck className="absolute h-5 w-5 text-caribbean-green-700" />
              )}
              <span className="pl-7">{label}</span>
            </li>
          </SelectItem>
        );
      })}
    </SelectContent>
  </Select>
);

export default CommentSortSelect;
