import { useEffect, useState } from "react";
import cl from "../../server/utility/cl.js";
import axios from "axios";

const baseUrl = `https://befr8n.vercel.app`;
const secondUrl = `/fms/api/v0`;
const thirdUrl = `/customer`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

function App() {
  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    async function loadCustomers() {
      try {
        const dbResponse = await axios.get(mergedUrl, {
          headers: {
            //Authorization: `Bearer ${tokenCookie}`,
          },
          withCredentials: false,
        });
        cl("this is the db response", dbResponse.data);
        setCustomerList(dbResponse.data.data);
      } catch (error) {
        if (error.response) {
          cl(`Error in response ${error.response.data}`);
        } else if (error.request) {
          cl(`Error in Request ${error.request}`);
        } else {
          cl(`Error found in Generic section ${error}`);
        }
      }
    }

    loadCustomers();
  }, []);
  return (
    <>
      <div className="text-3xl text-red-500 font-bold flex justify-center space-x-4 items-start">
        {/* <div>
          <p>Udyamen hi sidhyanti, karyaani naa manorathai |</p>
          <p> Naa hi suptasya Sinhansya , pravishanti mukhen mrigah ||</p>
        </div>
        <div>Om Gan Ganpataye Namo Namah</div> */}
        <div>Count of Custoemers : {customerList.length}</div>
        {
          <ul>
            {customerList.map((ele, index) => {
              return (
                <li key={ele._id}>
                  {ele.code} : {ele.name}
                </li>
              );
            })}
          </ul>
        }
      </div>
    </>
  );
}

export default App;
