import React, { createRef } from 'react';
import { SimpleCanvas, SimpleCanvasRef } from '../src/SimpleCanvas';
import renderer, { act, create } from 'react-test-renderer';
import { View } from 'react-native';

const mockTouchEvent = {
  nativeEvent: {
    pageX: 192,
    pageY: 124,
    touches: [{ pageX: 192, pageY: 124 }]
  },
  touchHistory: {
    indexOfSingleActiveTouch: 1,
    mostRecentTimeStamp: 411733262.676947,
    numberActiveTouches: 1,
    touchBank: [
      undefined,
      {
        currentPageX: 192,
        currentPageY: 124,
        currentTimeStamp: 411733262.676947,
        previousPageX: 192,
        previousPageY: 324,
        previousTimeStamp: 411733234.333552,
        startPageX: 202,
        startPageY: 647.6666564941406,
        startTimeStamp: 411731079.78750896,
        touchActive: true,
      },
    ],
  },
};

const mockMoveEvent = {
  ...mockTouchEvent,
  nativeEvent: {
    ...mockTouchEvent.nativeEvent,
    pageX: 200,
    pageY: 200,
  },
};

const mockOutOfContainerMoveEvent = {
  ...mockTouchEvent,
  nativeEvent: {
    ...mockTouchEvent.nativeEvent,
    pageX: 333,
    pageY: 333,
  },
};

describe('SimpleCanvas', () => {
  it('should render', () => {
    const tree = renderer.create(
      <SimpleCanvas onDragEvent={() => {}} onCanvasChange={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onDragEvent when starting to draw', () => {
    const onDragEvent = jest.fn();
    const component = create(<SimpleCanvas onDragEvent={onDragEvent} />);
    const views = component.root.findAllByType(View);
    const panHandler = views[1];

    act(() => {
      panHandler.props.onLayout({ nativeEvent: { layout: { height: 300, width: 300 } } });
      panHandler.props.onStartShouldSetResponder();
      panHandler.props.onResponderGrant(mockTouchEvent);
    });

    act(() => panHandler.props.onResponderMove(mockMoveEvent));

    act(() => panHandler.props.onResponderRelease({}));

    expect(onDragEvent).toHaveBeenCalled();
  });

  it('stops drawing when out of container', () => {
    const onDragEvent = jest.fn();
    const component = create(<SimpleCanvas onDragEvent={onDragEvent} />);
    const views = component.root.findAllByType(View);
    const panHandler = views[1];

    act(() => {
      panHandler.props.onLayout({ nativeEvent: { layout: { height: 300, width: 300 } } });
      panHandler.props.onStartShouldSetResponder();
      panHandler.props.onResponderGrant(mockTouchEvent);
    });

    act(() => panHandler.props.onResponderMove(mockOutOfContainerMoveEvent));

    expect(onDragEvent).toHaveBeenCalled();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('resets the signature', () => {
    const ref = createRef<SimpleCanvasRef>();
    const component = create(<SimpleCanvas ref={ref} />);

    act(() => {
      const instance = component.root;
      const views = instance.findAllByType(View);
      views[1].props.onResponderGrant(mockTouchEvent);
    });

    expect(ref.current).not.toBeNull();

    act(() => {
      ref.current?.resetImage();
    });

    const instance = component.root;
    const paths = instance.findAllByProps({ stroke: 'black' });
    expect(paths.length).toBe(0);
  });
});
