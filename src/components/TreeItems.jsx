import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { getAllChildrens, getAllParents } from '../services/inputs';
import { isUserStorageKey, setUserStorageKey } from '../services/users';
import '../styles/TreeItems.css';

class TreeItems extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleHidden = this.handleHidden.bind(this);

    this.state = {
      hidden: isUserStorageKey(props.id, 'hiddenUsers'),
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (isUserStorageKey(id, 'indeterminateUsers')) document.getElementById(id).indeterminate = true;
  }

  handleInput({ target }) {
    const { id, children } = this.props;
    const parents = getAllParents(target);
    const isChecked = target.indeterminate ? true : target.checked;
    setUserStorageKey(id, false, 'indeterminateUsers');
    setUserStorageKey(id, isChecked, 'savedUsers');

    // MARCAÇÃO DOS FILHOS
    const childrenInputs = JSON.stringify(children) === '{}' ? [] : getAllChildrens(target);
    childrenInputs.forEach((input) => {
      input.indeterminate = false;
      setUserStorageKey(input.id, false, 'indeterminateUsers');
      input.checked = isChecked;
      setUserStorageKey(input.id, isChecked, 'savedUsers');
    });

    // MARCAÇÃO DOS PAIS (CASO TODOS ESTEJAM SELECIONADOS OU CASO ALGUM ESTEJA SELECIONADO)
    parents.forEach((parent) => {
      const some = getAllChildrens(parent).some(({ checked }) => checked);
      const every = getAllChildrens(parent).every(({ checked }) => checked);

      const values = {
        true: { indeterminate: false, checked: true },
        false: { indeterminate: some, checked: false },
      };

      parent.indeterminate = values[every].indeterminate;
      setUserStorageKey(parent.id, values[every].indeterminate, 'indeterminateUsers');
      parent.checked = values[every].checked;
      setUserStorageKey(parent.id, values[every].checked, 'savedUsers');
    })
  }

  handleHidden() {
    const { id } = this.props;
    const { hidden } = this.state;

    setUserStorageKey(id, !hidden, 'hiddenUsers');
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
        data-testid="user-section"
      >
        {/* DIV CRIADA PARA ALINHAMENTO COM O BOTÃO */}
        <div>
          {btnCondition && (
            <button
              onClick={this.handleHidden}
              data-testid="hidden-btn"
            >
              <MdOutlineArrowForwardIos
                className={`hidden-btn${hidden ? ' rotate' : ''}`}
                data-testid={hidden ? 'hidden-icon' : undefined}
              />
            </button>
          )}
          <label htmlFor={id}>
            <input
              id={id}
              type="checkbox"
              defaultChecked={isUserStorageKey(id, 'savedUsers')}
              onChange={this.handleInput}
              data-testid="data-checkbox"
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
