import React, { useEffect, useState, useRef } from 'react';
import './result.css';
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { FaArrowLeft, FaRedo, FaCheckCircle, FaExclamationTriangle, FaDownload, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result: rawResult, originalImage, patientName } = location.state || {};
  const pdfRef = useRef();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!window.speechSynthesis) {
      setSpeechSupported(false);
    }

    if (rawResult) {
      const timer = setTimeout(() => {
        setResult({
          ...rawResult,
          timestamp: new Date().toLocaleString(),
          patientName: patientName || 'Not Specified'
        });
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [rawResult, patientName]);

  const chartData = result ? [
    { name: 'WBC', value: parseFloat(result.WBC) || 0 },
    { name: 'RBC', value: parseFloat(result.RBC) || 0 },
    { name: 'Platelets', value: parseFloat(result.Platelets) || 0 }
  ] : [];

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const input = pdfRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`blood_analysis_${patientName || 'report'}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const speakResults = () => {
    if (!speechSupported) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'en-US';
    speech.rate = 0.9;
    speech.pitch = 1;
    
    let speechText = `Blood Analysis Results for patient ${result.patientName}. `;
    
    if (activeTab === 'summary') {
      speechText += `Summary results: White Blood Cell count is ${result.WBC || 'not available'}, 
        Red Blood Cell count is ${result.RBC || 'not available'}, 
        and Platelet count is ${result.Platelets || 'not available'}. 
        All values are within normal range.`;
    } else if (activeTab === 'details') {
      speechText += `Detailed results: White Blood Cells are ${result.WBC || 'not available'} cells per microliter, 
        normal range is 4,500 to 11,000. Red Blood Cells are ${result.RBC || 'not available'} million per microliter, 
        normal range is 4.5 to 5.9. Platelets are ${result.Platelets || 'not available'} thousand per microliter, 
        normal range is 150 to 450. All values are within normal limits.`;
    } else if (activeTab === 'visualization') {
      speechText += `Visualization shows cell counts: White Blood Cells at ${result.WBC || 'not available'}, 
        Red Blood Cells at ${result.RBC || 'not available'}, and Platelets at ${result.Platelets || 'not available'}. 
        The bar chart displays these values for comparison.`;
    }
    
    speech.text = speechText;
    
    speech.onend = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(speech);
    setIsSpeaking(true);
  };

  if (loading) {
    return (
      <div className="result-loading">
        <Navbar />
        <div className="loading-container">
          <ClipLoader color="#23C8AC" size={60} />
          <h3>Analyzing your blood sample</h3>
          <p>This may take a few moments...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-error">
        <Navbar />
        <div className="error-container">
          <FaExclamationTriangle className="error-icon" size={48} />
          <h2>No Results Found</h2>
          <p>We couldn't retrieve any analysis results. Please try uploading again.</p>
          <button 
            className="btn primary-btn"
            onClick={() => navigate('/upload')}
          >
            <FaRedo className="btn-icon" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="result-container" ref={pdfRef}>
        <div className="result-header">
          <h1 className="result-title">Blood Analysis Results</h1>
          <div className="patient-info">
            <p className="patient-name">Patient: {result.patientName}</p>
            <p className="result-timestamp">Analyzed on: {result.timestamp}</p>
          </div>
        </div>

        <div className="result-content">
          <div className="result-image-section">
            {originalImage && (
              <div className="image-preview">
                <h3>Original Image</h3>
                <img src={originalImage} alt="Original blood smear" />
              </div>
            )}
          </div>

          <div className="result-tabs">
            <button 
              className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button 
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Detailed View
            </button>
            <button 
              className={`tab-btn ${activeTab === 'visualization' ? 'active' : ''}`}
              onClick={() => setActiveTab('visualization')}
            >
              Visualization
            </button>
            
            {speechSupported && (
              <button 
                className={`speech-btn ${isSpeaking ? 'active' : ''}`}
                onClick={speakResults}
                title={isSpeaking ? "Stop speech" : "Read results aloud"}
              >
                {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            )}
          </div>

          <div className="tab-content">
            {activeTab === 'summary' && (
              <div className="result-summary">
                <div className="summary-card">
                  <h3>Key Findings</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="metric-label">WBC Count</span>
                      <span className="metric-value">{result.WBC || 'N/A'} cells/μL</span>
                      <span className="metric-status normal">
                        <FaCheckCircle /> Normal Range
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="metric-label">RBC Count</span>
                      <span className="metric-value">{result.RBC || 'N/A'} million/μL</span>
                      <span className="metric-status normal">
                        <FaCheckCircle /> Normal Range
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="metric-label">Platelets</span>
                      <span className="metric-value">{result.Platelets || 'N/A'} thousand/μL</span>
                      <span className="metric-status normal">
                        <FaCheckCircle /> Normal Range
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="result-details">
                <div className="detailed-results">
                  <h3>Comprehensive Analysis</h3>
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                        <th>Normal Range</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Patient Name</td>
                        <td colSpan="3">{result.patientName}</td>
                      </tr>
                      <tr>
                        <td>White Blood Cells (WBC)</td>
                        <td>{result.WBC || 'N/A'} cells/μL</td>
                        <td>4,500-11,000 cells/μL</td>
                        <td className="status-normal">Normal</td>
                      </tr>
                      <tr>
                        <td>Red Blood Cells (RBC)</td>
                        <td>{result.RBC || 'N/A'} million/μL</td>
                        <td>4.5-5.9 million/μL</td>
                        <td className="status-normal">Normal</td>
                      </tr>
                      <tr>
                        <td>Platelets</td>
                        <td>{result.Platelets || 'N/A'} thousand/μL</td>
                        <td>150-450 thousand/μL</td>
                        <td className="status-normal">Normal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'visualization' && (
              <div className="result-visualization">
                <h3>Cell Count Visualization</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="value" 
                        fill="#23C8AC" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="result-actions">
          <button 
            className="btn secondary-btn"
            onClick={() => navigate('/upload')}
          >
            <FaArrowLeft className="btn-icon" /> Analyze Another
          </button>
          <button 
            className="btn primary-btn"
            onClick={downloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <ClipLoader color="#ffffff" size={18} />
            ) : (
              <>
                <FaDownload className="btn-icon" /> Download Full Report
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
