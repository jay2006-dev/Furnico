async function test() {
  try {
    const loginRes = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'jay@gmail.com',
        password: '123456' 
      })
    });
    const loginData = await loginRes.json();
    console.log("Login token:", loginData.token.substring(0, 10));

    const token = loginData.token;

    const orderRes = await fetch('http://localhost:5000/api/v1/orders/69e1f0776e002ab7f1f0bfd1', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const orderData = await orderRes.json();
    console.log("Order fetch response:", orderData);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
