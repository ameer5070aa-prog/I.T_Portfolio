import { lazy } from 'react';

import AdminLayout from 'layouts/AdminLayout';
import GuestLayout from 'layouts/GuestLayout';

const DashboardSales = lazy(() => import('../views/dashboard/DashSales/index'));

const Typography = lazy(() => import('../views/ui-elements/basic/BasicTypography'));
const Color = lazy(() => import('../views/ui-elements/basic/BasicColor'));

const FeatherIcon = lazy(() => import('../views/ui-elements/icons/Feather'));
const FontAwesome = lazy(() => import('../views/ui-elements/icons/FontAwesome'));
const MaterialIcon = lazy(() => import('../views/ui-elements/icons/Material'));

const Login = lazy(() => import('../views/auth/login'));
const Register = lazy(() => import('../views/auth/register'));

const Sample = lazy(() => import('../views/sample'));

// Portfolio Management Views
const ProjectsManager = lazy(() => import('../views/portfolio/ProjectsManager'));
const SkillsManager = lazy(() => import('../views/portfolio/SkillsManager'));
const CertificationsManager = lazy(() => import('../views/portfolio/CertificationsManager'));
const ContactViewer = lazy(() => import('../views/portfolio/ContactViewer'));
const PersonalInfoEditor = lazy(() => import('../views/portfolio/PersonalInfoEditor'));

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AdminLayout />,
      children: [
        {
          path: '/dashboard/sales',
          element: <DashboardSales />
        },
        {
          path: '/typography',
          element: <Typography />
        },
        {
          path: '/color',
          element: <Color />
        },
        {
          path: '/icons/Feather',
          element: <FeatherIcon />
        },
        {
          path: '/icons/font-awesome-5',
          element: <FontAwesome />
        },
        {
          path: '/icons/material',
          element: <MaterialIcon />
        },

        {
          path: '/sample-page',
          element: <Sample />
        },
        // Portfolio Management Routes
        {
          path: '/portfolio/projects',
          element: <ProjectsManager />
        },
        {
          path: '/portfolio/skills',
          element: <SkillsManager />
        },
        {
          path: '/portfolio/certifications',
          element: <CertificationsManager />
        },
        {
          path: '/portfolio/contact',
          element: <ContactViewer />
        },
        {
          path: '/portfolio/personal',
          element: <PersonalInfoEditor />
        }
      ]
    },
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    }
  ]
};

export default MainRoutes;
