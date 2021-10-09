import jwt from 'jsonwebtoken'

const userSession = () => {
    try {
        if(typeof window !== 'undefined'){
            const data = JSON.parse(window.localStorage.getItem('neuron-token'));
            if(data){
                const verifyToken = jwt.verify(data, 'zyxwvutsrqponmlkjihgfedcbaneuronclub');
                return verifyToken;
            }
        }
    } catch (error) {
        return ;
    }
}

export { userSession }