import FutureEarningsCalculator from "./Components/FutureEarningsCalculator";
import Test from "./Components/Test";


function App() {
  return (
    <div className="flex flex-col py-[50px] lg:px-[80px]  md:px-[60px] sm:px-[40px]  px-[10px] shadow-xl  justify-center items-center w-[85%] m-auto md:mt-[5rem] mt-[3rem] rounded-[20px] font-montserrat text-center">
   {/* <Test /> */}
   <div className="md:w-[90%] w-[100%] pb-[50px]">
            <h1 className='text-[24px]  font-semibold mb-[.5rem]'>Estimate Your
Future Earnings</h1>
            <p className='leading-[28px] '>
            Know the value of your desired STEM Masters course—assess its real return on investment and compare across countries. Considering a different course? Connect with an expert to explore its ROI.
            </p>
         </div>
   <FutureEarningsCalculator />
    </div>
  );
}

export default App;
