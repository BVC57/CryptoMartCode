# Crypto Marketplace — starter scaffold

What you get:
- Backend: Express + MongoDB (auth, items), security middleware (helmet, rate-limit), JWT auth.
- Frontend: React + Vite + Redux Toolkit + MUI + Tailwind. Theme centrally controlled with Redux UI slice.
- Contracts: Hardhat + simple Marketplace.sol (example only).
- Ethers integration: use ethers in frontend to connect MetaMask and call contract functions (sample usage not fully wired).

Run backend:
1. cd backend
2. npm install
3. copy .env.example to .env and edit values
4. npm run dev

Run frontend:
1. cd frontend
2. npm install
3. npm run dev (app runs on http://localhost:3000)

Contracts:
1. cd contracts
2. npm install
3. npx hardhat compile

Security & performance features included:
- Backend: helmet, express-rate-limit, validate payload sizes, JWT auth, password hashing.
- Frontend: token stored in localStorage (you can replace with HttpOnly cookies), Content-Security-Policy meta in index.html, lazy-loading, React.memo, useMemo usage.
- Recommendations: use HTTPS in production, store tokens in secure, HttpOnly cookies, audit smart contracts, use logging/monitoring, enable DB backups.

This scaffold is intentionally small so you can extend it — adding payment verification endpoints that listen to blockchain events is recommended.  

