import OnboardingForm from '@/components/onboarding-form';
import { redirect } from 'next/navigation';
import { fetchCurrentUser, readUser } from '@/actions/user.actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding / PostPlanet',
};

export default async function Onboarding() {
  const { id, imageUrl, fullName } = await fetchCurrentUser();
  const onboardedUser = await readUser(id);

  if (onboardedUser) redirect('/home');

  return (
    <main className='flex items-center justify-center min-h-screen'>
      <OnboardingForm imageUrl={imageUrl} fullName={fullName} />
    </main>
  );
}
