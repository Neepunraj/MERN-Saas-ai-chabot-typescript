import { AppBar, Toolbar } from '@mui/material'

import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink';




function Header() {
    const auth = useAuth();
    

  

    return (
        <AppBar sx={{bgcolor:'transparent',position:'static', boxShadow:'none'}}>
            <Toolbar sx={{display:'flex'}}>
                <Logo />
                <div>
                    {
                        auth?.isLoggedIn?<>
                        <NavigationLink 
                        to='/chat'
                        bg='#00fffc'
                        text='Go to Chat'
                        textColor='black' />
                        <NavigationLink 
                        onClick={auth.logout}
                        to='/'
                        bg='#51538f'
                        text='Logout'
                        textColor='white'
                        
                        />
                        
                        </>:<>
                        <NavigationLink 
                       to='/login'
                       bg='#00fffc'
                       text='Login'
                       textColor='black' 
                        />
                         <NavigationLink 
                       to='/signup'
                       bg='#51538f'
                       text='Signup'
                       textColor='White' 
                        />
                        </>
                    }

                    
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
