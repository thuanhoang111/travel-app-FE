// project import
import Navigation from './Navigation';
import SimpleBar from '~/pages/admin/components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
   <SimpleBar
      sx={{
         '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
         },
      }}
   >
      <Navigation />
      {/* <NavCard /> */}
   </SimpleBar>
);

export default DrawerContent;
