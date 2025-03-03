import { render, screen } from "@testing-library/react";
import { GlobalStateProvider } from "@/context/GlobalStateProvider";
import { useGlobalState } from "@/context/GlobalContext";

describe("GlobalStateProvider", () => {
  it("provides the global state to child components", () => {
    const TestComponent = () => {
      const { cart } = useGlobalState();
      return <div data-testid="cart-length">{cart.length}</div>;
    };

    render(
      <GlobalStateProvider>
        <TestComponent />
      </GlobalStateProvider>
    );

    expect(screen.getByTestId("cart-length")).toHaveTextContent("0");
  });

  
});
