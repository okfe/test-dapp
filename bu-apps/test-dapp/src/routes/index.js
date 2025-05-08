import btc from './btc';
import cases from './cases';
import ton from './ton';

const router = [
  {
    path: '/',
    name: 'Intro',
    component: './Home',
  },
  {
    name: 'PSBT Tools',
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
router.push(cases);

export default router;
