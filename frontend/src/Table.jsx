import React from "react";
import { ScrollSyncPane } from "react-scroll-sync";

const Table = ({ data }) => {
  return (
    <ScrollSyncPane>
      <div className="overflow-x-auto overflow-y-auto h-full overscroll-none">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"}
                key={index}
              >
                <td className="text-sm text-gray-500">{index}</td>
                <td className="whitespace-nowrap px-1 text-sm font-medium text-gray-900">
                  {item}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollSyncPane>
  );
};

export default Table;
