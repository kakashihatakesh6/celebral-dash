# POS System with Next.js

A modern Point of Sale (POS) system built with Next.js, featuring real-time cart management, payment processing with Razorpay, and receipt generation.

## Features

- 🛍️ Service/Product Management
- 🛒 Real-time Cart Management
- 💳 Secure Payment Processing with Razorpay
- 📧 Customer Information Collection
- 🧾 Digital Receipt Generation
- 📱 Responsive Design
- 💰 Payment History Tracking

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payment Gateway**: Razorpay
- **State Management**: React useState
- **Notifications**: React-Toastify

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.0 or later
- A Razorpay account with API keys
- npm or yarn package manager

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pos-system.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. **Adding Items to Cart**:
   - Browse available services
   - Click "Add to Cart" for desired items
   - Adjust quantities in the cart

2. **Checkout Process**:
   - Review cart items
   - Fill in customer details
   - Proceed to payment

3. **Payment**:
   - Complete payment through Razorpay
   - Receive digital receipt
   - View payment history

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript types
├── public/           # Static assets
└── ...
```

## API Endpoints

- `POST /api/create-order`: Creates a new Razorpay order
- `POST /api/verify-payment`: Verifies payment signature
- `POST /api/orders`: Stores order information
- `GET /api/orders`: Retrieves order history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or open an issue in the repository.
