'use client';

import { Button } from './ui/button';

type ToggleFollowButtonProps = {
  optimisticFollow?: boolean;
  toggleFollow?: () => Promise<void>;
  handleMouseOver?: () => void;
  handleMouseOut?: () => void;
  btnText?: string;
};

export default function ToggleFollowButton({
  optimisticFollow,
  toggleFollow,
  handleMouseOver,
  handleMouseOut,
  btnText,
}: ToggleFollowButtonProps) {
  if (optimisticFollow)
    return (
      <Button
        variant='secondary'
        size='sm'
        className='rounded-full hover:bg-destructive/10 hover:text-destructive'
        onClick={toggleFollow}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {btnText}
      </Button>
    );

  return (
    <Button
      size='sm'
      className='rounded-full text-white dark:text-black font-semibold bg-black hover:bg-black/75 dark:bg-white/75'
      onClick={(e) => {
        if (toggleFollow) toggleFollow();
        e.stopPropagation();
      }}
    >
      Follow
    </Button>
  );
}
