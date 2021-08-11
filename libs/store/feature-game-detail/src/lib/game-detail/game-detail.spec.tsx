import { render } from '@testing-library/react';

import StoreFeatureGameDetail from './game-detail';

describe('StoreFeatureGameDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StoreFeatureGameDetail />);
    expect(baseElement).toBeTruthy();
  });
});
