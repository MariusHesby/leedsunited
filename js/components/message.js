const newError = (message, error) => {
  return `
          <div class="alert">
            <p>${message}</p>
            <p class="warning">${error}</p>
          </div>
        `;
};
