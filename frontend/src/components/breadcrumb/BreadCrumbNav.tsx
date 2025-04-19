import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { BASE_PATH } from '../../constants/Constants.ts';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import './breadcrumb.css';
import Icon from '../icon/Icon.tsx';

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const relativePath = location.pathname.startsWith(BASE_PATH)
    ? location.pathname.slice(BASE_PATH.length)
    : location.pathname;

  const pathSegments = relativePath
    .split('/')
    .filter((segment) => Boolean(segment) && !/^\d+$/.test(segment));

  if (relativePath === '/launches') {
    return null;
  }

  const breadcrumbItems: IBreadcrumbItem[] = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

    const capitalizedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

    let text = decodeURIComponent(capitalizedSegment);
    if (text === 'Profiles') {
      text = localStorage.getItem('launchName') || 'Profiles';
    }

    return {
      text: text,
      key: path,
      onClick:
        index === pathSegments.length - 1
          ? undefined
          : (ev?: React.MouseEvent<HTMLElement>) => {
              if (ev) ev.preventDefault();
              navigate(path);
            },
      isCurrentItem: index === pathSegments.length - 1,
    };
  });

  return (
    <Breadcrumb
      items={breadcrumbItems}
      dividerAs={() => <Icon name="divider" width={12} height={20} />}
    />
  );
};

export default BreadcrumbNav;
