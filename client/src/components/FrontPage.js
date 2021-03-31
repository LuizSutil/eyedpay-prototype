import '../App.css'
import eye from '../EyedPay.png'
import {Link} from 'react-router-dom'



export const FrontPage = () => {
    return (
        <div>
            <div>
            <img src={eye} alt="eye" style={{width:350, height:200}}/>
            </div>

        <div className="btnPlacer">
            <Link to='/Login'>
            <button className="button" style = {{color: 'gainsboro'}}>Login</button>
            </Link>
        </div>

        <div className="btnPlacer">
            <Link to='/registration'>
            <button className="button" style = {{color: 'gainsboro'}} >Register</button>
            </Link>
        </div>
        
        <div className="btnPlacer">
            <Link to='/POS'>
                <button className="button" style = {{color: 'gainsboro'}}>POS</button>     
            </Link>
        </div>
    </div>
    )
}

export default FrontPage
