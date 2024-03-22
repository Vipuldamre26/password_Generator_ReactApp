import { useRef, useState } from 'react';
import './password.css';
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Password = () => {


    const AA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const aa = 'abcdefghijklmnopqrstuvwxyz';
    const num = '1234567890';
    const symbol = `~!@#$%^&*()-_=+[]{}|;:'",.<>?/`;


    const [ password, setPassword ] = useState('');
    const [ number, setNumber ] = useState(8);
    const ref1 = useRef(true);
    const ref2 = useRef(true);
    const ref3 = useRef(true);
    const ref4 = useRef(true);
    const ref5 = useRef();
    const refNum = useRef();


    // *************************************************************

    const generatePassword = () => {
        const notify = () => toast("Password length out of length!");

        if(refNum.current.value < 8 || refNum.current.value > 50){
            notify();
            return;
        }

        if(ref1.current.checked === false && ref2.current.checked === false && ref3.current.checked === false && ref4.current.checked === false){
            toast('Please select at least one checked box');
            console.log('false');
            return;
        }

        let password = '';
        for (let i = 0; i < number; i++) {
            password += getRandom();
        }

        console.log(getRandom());

        setPassword(password);



    }
    

    // *************************************************************

    function getRandom() {

        const arr = [];
        if (ref1.current.checked) {
            arr.push(AA[Math.floor(Math.random() * AA.length)]);
        }

        if (ref2.current.checked) {
            arr.push(aa[Math.floor(Math.random() * aa.length)]);
        }

        if (ref3.current.checked) {
            arr.push(num[Math.floor(Math.random() * num.length)]);
        }

        if (ref4.current.checked) {
            arr.push(symbol[Math.floor(Math.random() * symbol.length)]);
        }


        return arr[Math.floor(Math.random() * arr.length)];
    }

    
    // *************************************************************

    const setValue = () => {
        let valueNum = document.querySelector('.inputNum').value;
        setNumber(valueNum);
    }

    // *************************************************************

    

    // copying password 
    const copyPassword = () => {
        var copyText = document.querySelector('.inputText').value;
        try {
            navigator.clipboard.writeText(copyText);
            toast('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    // *************************************************************



    return(

        <div className='password p-4 h-screen'>

            <h1 className='text-gray-50 text-4xl font-medium m-0 text-center p-8'>Password Generator</h1>

            <div className='container w-3/4 m-auto bg-slate-200 p-8'>

                <div className='flex items-center justify-between '>
                    <input value={password} disabled ref={ref5} className='inputText w-11/12 bg-white border-stone-400 h-10 shadow-lg my-4' type='text' ></input>
                    <div className='bg-blue-500 h-full'>
                        <FaCopy onClick={copyPassword} className='text-4xl w-10 cursor-pointer' />
                    </div>
                </div>

                <div className='flex items-center justify-between flex-wrap'>
                    <p>Select Password length [ **8-50 characters** ]</p>
                    <input onChange={setValue} defaultValue={number} ref={refNum} type='number' className=' inputNum w-24 text-white bg-black'></input>
                </div>

                <div>

                    <div>
                        <input onChange={ () => true ? false : true } ref={ref1} type='checkbox' id='uppercase'></input>
                        <label for='uppercase'>Include upper case</label>
                    </div>

                    <div>
                        <input onChange={ () => true ? false : true } ref={ref2} type='checkbox' id='lowercase'></input>
                        <label for='lowercase'>Include lower case</label>
                    </div>

                    <div>
                        <input onChange={ () => true ? false : true } ref={ref3} type='checkbox' id='number'></input>
                        <label for='number'>Include numbers</label>
                    </div>
                    
                    <div>
                        <input onChange={ () => true ? false : true } ref={ref4} type='checkbox' id='symbol'></input>
                        <label for='symbol'>Include symbols</label>
                    </div>

                </div>

                <button onClick={generatePassword} className='bg-slate-800 text-white w-full h-10 rounded m-auto my-4 '>Generate Password</button>
            </div>
            <ToastContainer className='items-center' />
        </div>
    )
}


export default Password;