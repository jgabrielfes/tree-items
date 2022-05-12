import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { getAllTargetInputs, getAllParents } from '../services/inputs';
import {
  isSavedUser, setSavedUser,
  isIndeterminateUser, setIndeterminateUser,
  isHiddenUser, setHiddenUser,
} from '../services/users';
import '../styles/TreeItems.css';

class TreeItems extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleHidden = this.handleHidden.bind(this);

    this.state = {
      hidden: isHiddenUser(props.id),
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (isIndeterminateUser(id)) document.getElementById(id).indeterminate = true;
  }

  handleInput({ target }) {
    const { id, children } = this.props;
    const parents = getAllParents(target);
    const isChecked = target.indeterminate ? true : target.checked;
    setIndeterminateUser(id, false);
    setSavedUser(id, isChecked);

    // MARCAÇÃO DOS FILHOS
    const childrenInputs = JSON.stringify(children) === '{}' ? [] : getAllTargetInputs(target);
    childrenInputs.forEach((input) => {
      input.indeterminate = false;
      setIndeterminateUser(input.id, false);
      input.checked = isChecked;
      setSavedUser(input.id, isChecked);
    });

    // MARCAÇÃO DOS PAIS (CASO TODOS ESTEJAM SELECIONADOS OU CASO ALGUM ESTEJA SELECIONADO)
    parents.forEach((parent) => {
      const some = getAllTargetInputs(parent).some(({ checked }) => checked);
      const every = getAllTargetInputs(parent).every(({ checked }) => checked);

      const values = {
        true: { indeterminate: false, checked: true },
        false: { indeterminate: some, checked: false },
      };

      parent.indeterminate = values[every].indeterminate;
      setIndeterminateUser(parent.id, values[every].indeterminate);
      parent.checked = values[every].checked;
      setSavedUser(parent.id, values[every].checked);
    })
  }

  handleHidden() {
    const { id } = this.props;
    const { hidden } = this.state;

    setHiddenUser(id, !hidden);
    this.setState({ hidden: !hidden });
  }

  render() {
    const { id, name, children } = this.props;
    const { hidden } = this.state;
    const btnCondition = Object.keys(children).length > 0;

    return (
      // SEÇÃO CRIADA PARA SEMÂNTICA DO HTML E ESTILIZAÇÃO
      <section
        className={`tree-container${hidden ? ' hidden' : (!btnCondition ? ' no-have-btn' : '')}`}
      >
        {/* DIV CRIADA PARA ALINHAMENTO COM O BOTÃO */}
        <div>
          {btnCondition && (
            <button
              onClick={this.handleHidden}
            >
              <MdOutlineArrowForwardIos
                className={`hidden-btn${hidden ? ' rotate' : ''}`}
              />
            </button>
          )}
          <label htmlFor={id}>
            <input
              id={id}
              type="checkbox"
              defaultChecked={isSavedUser(id)}
              onChange={this.handleInput}
            />
            <span className="tree-item-name">{name}</span>
          </label>
        </div>
        {/* RENDERIZAÇÃO RECURSIVA DOS FILHOS */}
        {Object.values(children).map((child) => (
          <TreeItems
            key={child.id}
            id={child.id}
            name={child.name}
            children={child.children}
          />
        ))}
      </section>
    );
  }
}

TreeItems.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TreeItems;
