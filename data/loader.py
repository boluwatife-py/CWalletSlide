"""
Data loading functions for Plant Village dataset
"""
import tensorflow as tf
import tensorflow_datasets as tfds
from config.config import DATASET_NAME, APPLE_CLASSES


def load_dataset():
    """
    Load the Plant Village dataset with info
    
    Returns:
        tuple: (dataset, info) where dataset contains train/test splits
    """
    print(f"Loading {DATASET_NAME} dataset...")
    dataset, info = tfds.load(
        DATASET_NAME,
        with_info=True,
        as_supervised=True
    )
    print("Dataset loaded successfully!")
    return dataset, info


def filter_apple_classes(dataset, label_names):
    """
    Filter dataset to only include apple disease classes and remap labels to 0-3
    
    Args:
        dataset: TensorFlow dataset
        label_names: List of all class names from dataset info
        
    Returns:
        Filtered dataset containing only apple images with remapped labels (0-3)
    """
    # Get apple class indices in original dataset
    apple_indices = [label_names.index(c) for c in APPLE_CLASSES]
    
    def is_apple(image, label):
        return tf.reduce_any(tf.equal(label, apple_indices))
    
    def remap_label(image, label):
        """Remap label from original index to 0-3"""
        # Create a lookup table for remapping
        keys = tf.constant(apple_indices, dtype=tf.int64)
        values = tf.constant(list(range(len(apple_indices))), dtype=tf.int64)
        
        # Create the lookup table
        table = tf.lookup.StaticHashTable(
            tf.lookup.KeyValueTensorInitializer(keys, values),
            default_value=-1
        )
        
        # Remap the label
        new_label = table.lookup(label)
        return image, new_label
    
    print("Filtering for apple classes only...")
    filtered_ds = dataset.filter(is_apple)
    
    # Remap labels to 0-3
    filtered_ds = filtered_ds.map(remap_label)
    
    print(f"Filtered dataset to {len(APPLE_CLASSES)} apple classes")
    print(f"Labels remapped: 0={APPLE_CLASSES[0]}, 1={APPLE_CLASSES[1]}, 2={APPLE_CLASSES[2]}, 3={APPLE_CLASSES[3]}")
    return filtered_ds


def get_label_names(info):
    """
    Extract label names from dataset info
    
    Args:
        info: Dataset info object
        
    Returns:
        list: List of all label names
    """
    return info.features['label'].names