import React from 'react';
import { ProductPerformance } from '../types';

interface ProductPerformanceTableProps {
  data: ProductPerformance[];
}

const ProductPerformanceTable: React.FC<ProductPerformanceTableProps> = ({ data }) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Product Profitability</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-700 text-sm text-slate-400">
            <tr>
              <th className="p-3 font-medium">Product Name</th>
              <th className="p-3 font-medium text-right">Total Sales</th>
              <th className="p-3 font-medium text-right">COGS</th>
              <th className="p-3 font-medium text-right">Margin</th>
              <th className="p-3 font-medium text-right">Net Profit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-700/50 transition-colors">
                <td className="p-3 font-medium text-white">{product.name}</td>
                <td className="p-3 text-right text-slate-300">{formatCurrency(product.sales)}</td>
                <td className="p-3 text-right text-slate-300">{formatCurrency(product.cost)}</td>
                <td className="p-3 text-right text-slate-300">{(product.margin * 100).toFixed(0)}%</td>
                <td className="p-3 text-right font-semibold text-emerald-400">{formatCurrency(product.profit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPerformanceTable;
