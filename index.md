---
layout: homepage
---

## About Me

I'm a graduate student pursuing a Master's in Computer Science at the University of Pennsylvania, specializing in **machine learning** and **parameter-efficient fine-tuning**. Currently, I'm conducting research at Brandeis University on efficient neural network training methods, where I've achieved **82-90% accuracy while training only 0.037% of model parameters**.

With a background in both **manufacturing engineering at Raytheon** and **ML research**, I bring a unique perspective combining production systems thinking with cutting-edge AI research. I hold an **active Secret Security Clearance** and have experience deploying ML solutions that deliver measurable impact.

**I'm actively seeking Summer 2026 internships in Machine Learning, Deep Learning, or AI Research.**

## Research Interests

- **Parameter-Efficient Fine-Tuning** (LoRA, Mask Fine-Tuning, Adapter Methods)
- **Large Language Models** (Training efficiency, Model compression)
- **Deep Learning Systems** (Distributed training, TPU optimization)
- **Neural Network Interpretability** (Layer importance analysis, Pruning)

## Recent News

- **[Oct 2025]** Implemented mask fine-tuning achieving 4.24% accuracy improvement on BERT
- **[June 2025]** Started ML research position at Brandeis University
- **[June 2025]** Received $100K+ cost reduction recognition at Raytheon for automation work

## Featured Projects

### Parameter-Efficient Fine-tuning Comparative Study
**Technologies:** PyTorch, Transformers, LoRA, TPU, Weights & Biases  
[[Code](https://github.com/chrisfrancisque/peft-study)] [[Blog Post](#)]

Comprehensive empirical study comparing Full Fine-Tuning (FFT), LoRA, and Mask Fine-Tuning (MFT) on BERT-base. Key findings:
- Achieved **4.24% accuracy improvement** using MFT on under-trained models
- Trained only **0.037% of 110M parameters** while maintaining competitive performance
- Identified critical embedding layers comprising <0.01% of weights that caused complete model collapse when removed
- Solved PyTorch XLA synchronization deadlocks on distributed TPU training

**Impact:** Demonstrates path to 100x more efficient LLM fine-tuning for resource-constrained environments.

### Production ML Pipeline at Raytheon
**Technologies:** Python, C++, SQL, Docker, Linux  
[[Private]]

Built automated analysis systems for manufacturing data that:
- Delivered **$60K annual cost savings** through defect prediction
- Reduced process times by **10-30%** across multiple production lines
- Processed millions of data points for real-time quality control
- Achieved **25% reduction** in operator training time through data-driven insights

**Impact:** Proved ML can deliver measurable ROI in traditional manufacturing environments.

### Aircraft 6-DOF Flight Dynamics Simulator
**Technologies:** C++, Physics-Based Modeling, Numerical Methods  
[[Code](https://github.com/chrisfrancisque/aircraft-sim)] [[Demo](#)]

High-fidelity physics simulation implementing:
- 6 degree-of-freedom rigid body dynamics with quaternion integration
- Aerodynamic modeling validated against NASA reference data
- Optimized numerical integration for real-time performance
- Custom visualization pipeline using matplotlibcpp

**Impact:** Demonstrates strong fundamentals in numerical methods and systems programming.

## Technical Skills

**Machine Learning & AI:**
- **Frameworks:** PyTorch (advanced), TensorFlow, Transformers, Hugging Face
- **Techniques:** LoRA, Fine-tuning, Model Pruning, Distributed Training, Gradient Analysis
- **Tools:** Weights & Biases, Jupyter, TPU/GPU Optimization

**Software Engineering:**
- **Languages:** Python (expert), C++ (proficient), Java, SQL, Bash
- **Systems:** Linux, Docker, Git, GCP, AWS
- **Libraries:** Pandas, NumPy, scikit-learn, Matplotlib

## Experience

**Machine Learning Researcher** | Brandeis University  
*June 2025 - Present*
- Implemented 3 research papers achieving 82-90% accuracy with 0.037% parameter training
- Built distributed training pipeline handling 110M parameters across 8 TPU cores
- Developed gradient tracking system revealing critical layer dependencies in transformers

**Manufacturing Engineer** | Raytheon  
*June 2022 - June 2025*
- Built Python/C++ automation pipelines saving $60K annually through ML-driven insights
- Programmed automated systems reducing cycle times by 10-30%
- Led data-driven root cause analysis preventing production defects

## Education

**University of Pennsylvania** | Master of Computer Science | Expected June 2027  
*Relevant Coursework:* Operating Systems, Data Structures & Algorithms, Discrete Math

**University of Massachusetts Amherst** | B.S. Mechanical Engineering | June 2024

## Open Source & Community

- **[GitHub](https://github.com/chrisfrancisque)** - 5+ public ML projects
- Writing technical blog posts on parameter-efficient fine-tuning (coming soon)
- Active contributor to ML research discussions

## Contact

**Email:** chrisfra [at] seas.upenn.edu  
**LinkedIn:** [linkedin.com/in/christopherfrancisque](https://linkedin.com/in/christopherfrancisque)  
**GitHub:** [github.com/chrisfrancisque](https://github.com/chrisfrancisque)

---

*Security Clearance: Active Secret | Available for Summer 2026 internships*