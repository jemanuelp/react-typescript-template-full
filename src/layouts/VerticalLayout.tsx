import { Outlet } from 'react-router-dom';
import Layout from '../@core/layouts/VerticalLayout';
import navigation from '../navigation/vertical';

const VerticalLayout = (props: any) => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
