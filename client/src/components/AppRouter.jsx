import ImportPg from './ImportPg'
import FrontPage from './FrontPage'
import eye from '../EyedPay.png'
import Login from './Login'
import Home from './Home'
import SetPay from './SetPay'
import AccountInfo from './AccountInfo'
import Registration from './Registration'
import RegisterPicture from './RegisterPicture'
import RangeSetter from './RangeSetter'
import GoodCharge from './GoodCharge'
import POS from './POS'
import ConfirmReg from './ConfirmReg'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom'

export const AppRouter = () => {
    return (
        <Router>
            
            <Route exact path='/' component={FrontPage}></Route> 
            <Route path='/login'component={Login}></Route>
            <Route path='/AccountInfo'component={AccountInfo}></Route>
            <Route path='/home'component={Home}></Route>
            <Route path='/limits'component={SetPay}></Route>


            <Route path='/registration' component={Registration}></Route>
            <Route path='/regPic' component={RegisterPicture}></Route>
            <Route path='/regConfirm' component={ConfirmReg}></Route>

            <Route path='/POS' component={POS}></Route>
            <Route path='/checkUser' component={ImportPg}></Route>
            <Route path='/goodCharge' component={GoodCharge}></Route>

            
        </Router>
    )
}

export default AppRouter
