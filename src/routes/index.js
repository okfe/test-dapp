import btc from './btc';
import ton from './ton';

const router = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'Home',
    path: '/home',
    component: './Home',
  },
  {
    name: 'PSBT',
    path: '/psbt',
    routes: [
      {
        name: 'builder',
        path: '/psbt/builder',
        component: './Tools/PSBT/PSBTBuilder',
      },
      {
        name: 'analyser',
        path: '/psbt/analyser',
        component: './Tools/PSBT/PSBTAnalyser',
      },
    ],
  },
];
router.push(btc);
router.push(ton);

export default router;
