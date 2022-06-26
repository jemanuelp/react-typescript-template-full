import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {getUser} from '../store';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Alert} from 'reactstrap';
import UserTabs from './Tabs';
import PlanCard from './PlanCard';
import UserInfoCard from './UserInfoCard';
import 'src/@core/scss/react/apps/app-users.scss';
import {RootState} from "../../../../redux/reducers/RootReducer";

const UserView = () => {
    const store = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<any>();
    const {id} = useParams();

    // ** Get suer on mount
    useEffect(() => {
        if (id) {
            dispatch(getUser(parseInt(id)));
        }
    }, [dispatch]);

    const [active, setActive] = useState<Number>(1);

    const toggleTab = (tab: Number) => {
        if (active !== tab) {
            setActive(tab);
        }
    };

    return store.selectedUser !== null && store.selectedUser !== undefined
        ? (
            <div className='app-user-view'>
                <Row>
                    <Col xl='4' lg='5' xs={{order: 1}} md={{order: 0, size: 5}}>
                        <UserInfoCard selectedUser={store.selectedUser}/>
                        <PlanCard/>
                    </Col>
                    <Col xl='8' lg='7' xs={{order: 0}} md={{order: 1, size: 7}}>
                        <UserTabs active={active} toggleTab={toggleTab}/>
                    </Col>
                </Row>
            </div>
        )
        : (
            <Alert color='danger'>
              <h4 className='alert-heading'>User not found</h4>
              <div className='alert-body'>
                User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users
                List</Link>
              </div>
            </Alert>
        );
};
export default UserView;