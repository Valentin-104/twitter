import { readActivities } from '@/actions/activity.action';
import Header from '@/components/header';
import { Activity, User } from '@prisma/client';
import SingleActivity from '@/components/single-activity';
import { currentUser } from '@clerk/nextjs';
import { User as U } from '@clerk/nextjs/server';
import { readUser } from '@/actions/user.actions';

export default async function Activities() {
  const user = (await currentUser()) as U;
  const { id, followingIds } = (await readUser(user.id)) as User;
  const activities = (await readActivities(id)) as Activity[];

  return (
    <main className='min-h-screen'>
      <Header isActivitiesPage />

      {activities.length ? (
        activities.map((activity) => (
          <SingleActivity
            {...activity}
            key={activity.id}
            followingIds={followingIds}
          />
        ))
      ) : (
        <p className='min-h-screen text-center mt-10'>No activities.</p>
      )}
    </main>
  );
}
