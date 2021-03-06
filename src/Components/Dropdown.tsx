import React, { CSSProperties } from "react";

//SVGs
import { ReactComponent as DropdownOpen } from "../SVG/dropdown-open.svg";
import { ReactComponent as DropdownClosed } from "../SVG/dropdown-closed.svg";

type Option = { actualValue: string; value: string };

type DropdownProps = {
  parentStyle?: CSSProperties;
  style?: CSSProperties;
  options: Option[] | string[];
  value: string;
  onChange: (newValue: string, newActualValue?: string) => void;
};

type DropdownState = {
  opened: boolean;
};

export default class Dropdown extends React.Component<
  DropdownProps,
  DropdownState
> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      opened: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  close() {
    this.setState({
      opened: false,
    });
  }

  open() {
    this.setState({
      opened: true,
    });
  }

  changeValue(value: string, actualValue?: string) {
    this.props.onChange(value, actualValue);
    this.close();
  }

  render() {
    return (
      <div className="dropdown-parent" style={this.props.parentStyle}>
        <div className="dropdown" style={this.props.style} onClick={this.open}>
          <div>
            {typeof this.props.options[0] === "string" ? (
              <span>{this.props.value ?? this.props.options[0]}</span>
            ) : (
              <span>{this.props.options[0].value}</span>
            )}
            <DropdownClosed className="svg_dropdown-closed" />
          </div>
        </div>
        {this.state.opened && (
          <div className="dropdown-opened">
            <DropdownOpen onClick={this.close} className="svg_dropdown-open" />
            {typeof this.props.options[0] === "string"
              ? (this.props.options as string[]).map(
                  (option: string, index: number) => {
                    return (
                      <div
                        key={"option-" + index}
                        onClick={() => this.changeValue(option)}
                      >
                        <p>{option}</p>
                      </div>
                    );
                  }
                )
              : (this.props.options as Option[]).map((option: Option) => {
                  return <p>{option.value}</p>;
                })}
          </div>
        )}
      </div>
    );
  }
}
