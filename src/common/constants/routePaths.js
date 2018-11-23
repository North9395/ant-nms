import Login from '../../page/login';
import GatexState from '../../page/GatexState/gatexState';
import PasswdConfig from '../../page/PasswdConfig/passwdConfig';
import InterfaceInfo from '../../page/InterfaceInfo/InterfaceInfo';
import NotFound from '../../page/notFound';
import SiderLayout from '../layout/layout';

const routes = [
    {
    //   exact: true,
      path: '/login',
      component: Login,
      layout: SiderLayout,
    }, 
    {
      path: '/gatexState',
      component: GatexState,
      layout: SiderLayout,
    },
    {
      path: '/gatexStatus',
      component: InterfaceInfo,
      layout: SiderLayout,
    },
    {
      path: '/passwdconfig',
      component: PasswdConfig,
      layout: SiderLayout,
    },
    {
      component: NotFound,
      layout: SiderLayout,
    },
  ];

  export default routes;