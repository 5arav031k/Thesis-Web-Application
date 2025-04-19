import { useParams } from 'react-router-dom';
import ProfilesContent from '../content/ProfilesContent.tsx';

const ProfilesContentWithParams = () => {
  const { id } = useParams<{ id: string }>();
  const launchName = localStorage.getItem('launchName') || '';

  return <ProfilesContent launchId={id!} launchName={launchName} />;
};

export default ProfilesContentWithParams;
