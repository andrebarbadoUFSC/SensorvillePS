import React, { useState } from 'react';
import ReactFormLabel from './ReactFormLabel';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const scriptUrl = 'https://script.google.com/macros/s/AKfycbxWLYiP8uowy_0_2D7qbRLTXu6ImzkVorU4wZHCbkp1Psf1bmyxf4Q80seRAzpLoJEG/exec';

// Opções para o React Select
const cursoOptions = [
  { value: 'Bacharelado em Ciência e Tecnologia', label: 'Bacharelado em Ciência e Tecnologia' },
  { value: 'Engenharia Aeroespacial', label: 'Engenharia Aeroespacial' },
  { value: 'Engenharia Automotiva', label: 'Engenharia Automotiva' },
  { value: 'Engenharia Ferroviária', label: 'Engenharia Ferroviária' },
  { value: 'Engenharia Civil', label: 'Engenharia Civil' },
  { value: 'Engenharia Mecatrônica', label: 'Engenharia Mecatrônica' },
  { value: 'Engenharia Naval', label: 'Engenharia Naval' },
  { value: 'Engenharia de Transporte e Logística', label: 'Engenharia de Transporte e Logística' },
];

const ReactForm = () => {
  const [formState, setFormState] = useState({
    nomeCompleto: '',
    celular: '',
    matricula: '',
    email: '',
    curso: null,
    arquivoMatricula: null
  });
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false); // Mova esta linha para dentro do componente ReactForm

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCursoChange = selectedOption => {
    setFormState(prevState => ({
      ...prevState,
      curso: selectedOption
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prevState => ({
          ...prevState,
          arquivoMatricula: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const submissionData = {
      ...formState,
      dataNascimento: dataNascimento ? dataNascimento.toISOString().slice(0, 10) : '', // Garante que a data esteja no formato YYYY-MM-DD
      curso: formState.curso ? formState.curso.value : '',
    };
  
    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
  
      alert('Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    } finally {
      setIsSubmitting(false);
      // Resetar o estado do formulário aqui
      setFormState({
        nomeCompleto: '',
        celular: '',
        matricula: '',
        email: '',
        curso: null,
        arquivoMatricula: null
      });
      setDataNascimento(new Date()); // ou setDataNascimento(null);
    }
  };
  return (
    <>

  <div className="form-header">
    <h2 className="form-title">Aplicação para Vaga de Emprego</h2>
    <p className="form-introduction">
      Bem-vindo ao processo de aplicação para uma vaga de emprego na Sensorville. Estamos
      entusiasmados com seu interesse em se juntar à nossa equipe. Por favor, preencha o formulário
      abaixo com suas informações e currículo. Nossa equipe de RH entrará em contato com os próximos
      passos. Boa sorte!
    </p>
  </div>



      <form className='react-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <ReactFormLabel htmlFor='nomeCompleto' title='Nome Completo:' />
          <input id='nomeCompleto' name='nomeCompleto' type='text' required onChange={handleChange} value={formState.nomeCompleto} />
        </div>

      <div className="form-group">
        <ReactFormLabel htmlFor='dataNascimento' title='Data de Nascimento:' />
        <DatePicker
          selected={dataNascimento}
          onChange={(date) => setDataNascimento(date)}
          dateFormat="dd/MM/yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="form-control" // Aplica estilos Bootstrap ou outro framework se estiver usando
        />
      </div>


      <div className="form-group">
        <ReactFormLabel htmlFor='celular' title='Celular:' />
        <input id='celular' name='celular' type='tel' pattern="[0-9]{11}" required onChange={handleChange} value={formState.celular} />
      </div>

      <div className="form-group">
        <ReactFormLabel htmlFor='matricula' title='Matrícula:' />
        <input id='matricula' name='matricula' type='number' required onChange={handleChange} value={formState.matricula} />
      </div>

      <div className="form-group">
        <ReactFormLabel htmlFor='email' title='E-mail para Contato:' />
        <input id='email' name='email' type='email' required onChange={handleChange} value={formState.email} />
      </div>

      <div className="form-group">
        <ReactFormLabel htmlFor='curso' title='Curso:' />
        <Select
          id='curso'
          name='curso'
          options={cursoOptions}
          value={formState.curso}
          onChange={handleCursoChange}
          placeholder="Selecione..."
        />
      </div>

      <div className="form-group">
          <ReactFormLabel htmlFor='arquivoMatricula' title='Currículo:' />
          <input id='arquivoMatricula' name='arquivoMatricula' type='file' accept=".pdf, image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </>
  );
};
export default ReactForm;
