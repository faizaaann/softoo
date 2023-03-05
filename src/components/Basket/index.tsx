import { BasketProps } from "@/interfaces";

const Basket: React.FC<BasketProps> = ({ items, total }) => {
  // If there are no items in the basket, show a message
  if (items.length === 0) {
    return <p>Your basket is empty.</p>;
  }

  return (
    <div className="px-8 py-4">
      <h2 className="text-xl font-bold mb-4">Your Basket</h2>
      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-300 pb-2"
            data-testid="basket-item"
          >
            <div className="flex items-center space-x-4">
              <img src={item.img} alt={item.name} className="w-16" />
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
        <p className="text-lg font-bold mt-4">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Basket;
