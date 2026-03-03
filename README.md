# Heart Disease Prediction Project

This project demonstrates a **machine learning model to predict heart disease** using the UCI Heart Disease dataset. The project is designed as a full-stack application with a backend model and a frontend interface for demonstration purposes.  

> **Note:** This model is for educational purposes only and **should not be used for real medical diagnosis**.

---

## Dataset

The dataset used is a cleaned version of the **UCI Heart Disease Dataset**. It contains 302 patient records with the following features:

| Feature      | Description |
|-------------|-------------|
| age         | Age of the patient |
| sex         | Gender (0 = female, 1 = male) |
| cp          | Chest pain type (0-3) |
| trestbps    | Resting blood pressure (in mm Hg) |
| chol        | Serum cholesterol (mg/dl) |
| fbs         | Fasting blood sugar > 120 mg/dl (1 = true; 0 = false) |
| restecg     | Resting ECG results (0-2) |
| thalach     | Maximum heart rate achieved |
| exang       | Exercise induced angina (1 = yes; 0 = no) |
| oldpeak     | ST depression induced by exercise relative to rest |
| slope       | Slope of the peak exercise ST segment |
| ca          | Number of major vessels colored by fluoroscopy (0-4) |
| thal        | Thalassemia (1 = normal; 2 = fixed defect; 3 = reversible defect) |
| target      | Heart disease (1 = disease, 0 = no disease) |

---

## Models Trained

The following models were trained and evaluated:

| Model       | Train Accuracy | Test Accuracy | CV Mean Accuracy |
|------------|----------------|---------------|-----------------|
| Logistic Regression | 0.863 | 0.836 | 0.828 |
| Decision Tree       | 1.000 | 0.787 | 0.738 |
| Random Forest       | 1.000 | 0.869 | 0.834 |
| K-Nearest Neighbors | 0.863 | 0.918 | 0.821 |

---

## Hyperparameter Tuning (Random Forest)

The **Random Forest model** was tuned using GridSearchCV with 5-fold cross-validation.  

**Best Parameters:**

```python
{
    'rf__max_depth': 10,
    'rf__max_features': 'sqrt',
    'rf__min_samples_leaf': 2,
    'rf__min_samples_split': 2,
    'rf__n_estimators': 300
}

---

## Conclusion

The Heart Disease Prediction Project demonstrates the application of machine learning for medical data analysis. Using the UCI Heart Disease dataset, we trained multiple models and found that a **Random Forest classifier** gave the best balance of accuracy and reliability after hyperparameter tuning.  

**Key Findings:**

- Random Forest achieved **88.5% test accuracy** with a strong balance between precision and recall.  
- Decision Tree overfitted the training data (100% train accuracy) but had lower test accuracy.  
- Logistic Regression and KNN also performed well, but Random Forest remained the best choice.  
- The model is capable of predicting the likelihood of heart disease based on patient data features such as age, cholesterol, chest pain type, and more.  

---

## Future Work

There are several ways to improve and extend this project:

1. **Larger and more diverse datasets** – Incorporate more patient data from hospitals or clinical trials to improve model robustness.  
2. **Feature Engineering** – Create new features or perform dimensionality reduction (PCA) to enhance prediction accuracy.  
3. **Ensemble Methods** – Explore stacking or boosting techniques to further improve predictions.  
4. **Deployment** – Integrate the model into a **web app** or **mobile app** with a clean user interface for demonstration purposes.  
5. **Explainability** – Implement SHAP or LIME to explain model predictions for each patient input.  

---

## Key Takeaways

- Machine learning can be applied to medical datasets to predict health outcomes.  
- Hyperparameter tuning is crucial for optimizing model performance.  
- Random Forest provides a good balance between accuracy and generalization.  
- This project demonstrates **end-to-end development**, from data processing to model deployment in a full-stack environment.  

---

## References

- [UCI Heart Disease Dataset](https://archive.ics.uci.edu/ml/datasets/Heart+Disease)  
- Scikit-learn documentation: [Random Forest Classifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)