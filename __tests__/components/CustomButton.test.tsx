import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {CustomButton} from '../../src/components/buttons/CustomButton';

describe('CustomButton', () => {
  it('renders correctly with text', () => {
    const {getByTestId} = render(<CustomButton text="Press me" />);
    const buttonText = getByTestId('custom-button');
    expect(buttonText).toBeTruthy();
  });

  it('displays the correct text', () => {
    const buttonText = 'Press Me';
    const {getByTestId} = render(<CustomButton text={buttonText} />);
    const button = getByTestId('custom-button');
    expect(button).toHaveTextContent(buttonText);
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <CustomButton text="Press me" onPress={onPressMock} />,
    );
    const button = getByTestId('custom-button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders with custom style', () => {
    const {getByTestId} = render(
      <CustomButton text="Press me" style={{backgroundColor: 'red'}} />,
    );
    const button = getByTestId('custom-button');
    const buttonStyle = button.props.style; // Obtener el estilo actual del botón
    console.log('Button style:', buttonStyle); // Mostrar el estilo actual en la consola
    expect(button).toHaveStyle({backgroundColor: 'red'});
  });
});
