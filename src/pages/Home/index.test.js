import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Home } from './index'

describe('Pages > Home', () => {
  const setup = async () => {
    const component = render(<Home />);
    return { component };
  };

  it("should render the component", async () => {
    await setup();
  });
});
