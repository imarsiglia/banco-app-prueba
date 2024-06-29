import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomInputText } from '../../src/components/inputs/CustomInputText';

describe('CustomInputText', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<CustomInputText testID="custom-input" />);
    const input = getByTestId('custom-input');
    expect(input).toBeTruthy();
  });

  it('renders the label when provided', () => {
    const label = 'Test Label';
    const { getByText } = render(<CustomInputText label={label} />);
    const labelText = getByText(label);
    expect(labelText).toBeTruthy();
  });

  it('renders with the correct styles when disabled', () => {
    const { getByTestId } = render(
      <CustomInputText testID="custom-input" editable={false} />
    );
    const input = getByTestId('custom-input');
    expect(input).toHaveStyle({ backgroundColor: '#EDEDED' });
  });

  it('calls onChangeText when the input value changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByTestId } = render(
      <CustomInputText testID="custom-input" onChangeText={onChangeTextMock} />
    );
    const input = getByTestId('custom-input');
    fireEvent.changeText(input, 'new text');
    expect(onChangeTextMock).toHaveBeenCalledWith('new text');
  });
});