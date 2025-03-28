import { useParams } from 'react-router-dom';
import ProfilesContent from '../content/ProfilesContent.tsx';

const ProfilesContentWithParams = () => {
  const { id } = useParams<{ id: string }>();
  return <ProfilesContent launchId={id!} />;
};

export default ProfilesContentWithParams;
